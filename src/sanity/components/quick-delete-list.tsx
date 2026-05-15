import { useCallback, useEffect, useState } from "react";
import { client } from "../lib/client";
import { writeClient } from "../lib/writeClient";
import { IntentLink } from "sanity/router";
import {
  Box,
  Button,
  Card,
  Flex,
  Spinner,
  Stack,
  Text,
  Badge,
} from "@sanity/ui";
import { TrashIcon, StarFilledIcon } from "@sanity/icons";
import groq from "groq";

type Doc = {
  _id: string;
  _type: string;
  _createdAt: string;
  // common
  title?: string;
  name?: string;
  label?: string;
  description?: string;
  excerpt?: string;
  // images
  imageUrl?: string;
  // project
  featured?: boolean;
  skills?: { name: string }[];
  // beyondItem
  body?: string;
  order?: number;
  // milestone
  date?: string;
  endDate?: string;
  category?: string;
  highlighted?: boolean;
  logo?: string;
  // blog
  publishedAt?: string;
  coverImage?: string;
  // planetMark
  emoji?: string;
  nickname?: string;
  mark?: string;
  planet?: { label: string };
};

type Props = {
  schemaType: string;
  orderField?: string;
};

const QUERY = (type: string, order: string) => groq`
  *[_type == "${type}"] | order(${order}) {
    _id, _type, _createdAt,
    title, name, label, description, excerpt, body,
    featured, highlighted, order,
    date, endDate, publishedAt, category,
    emoji, nickname, mark,
    "skills": skills[]->{ name },
    "imageUrl": coalesce(
      image.asset->url,
      images[0].asset->url,
      coverImage.asset->url,
      logo.asset->url
    ),
    "planet": planet->{ label },
  }
`;

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function DocRow({
  doc,
  schemaType,
  onDelete,
  onConfirm,
  onCancelConfirm,
  isDeleting,
  isConfirming,
}: {
  doc: Doc;
  schemaType: string;
  onDelete: (id: string) => void;
  onConfirm: (id: string) => void;
  onCancelConfirm: () => void;
  isDeleting: boolean;
  isConfirming: boolean;
}) {
  const isPlanetMark = schemaType === "planetMark";

  const primaryLabel =
    doc.title ??
    doc.name ??
    doc.label ??
    (isPlanetMark
      ? `${doc.emoji ?? ""} ${doc.nickname ?? "Anonymous"}`
      : doc._id);

  const secondaryLabel =
    doc.description ??
    doc.excerpt ??
    (isPlanetMark ? doc.mark : null) ??
    doc.body;

  const date = formatDate(doc.date ?? doc.publishedAt ?? doc._createdAt);

  return (
    <Card
      padding={0}
      radius={2}
      shadow={1}
      tone={isConfirming ? "critical" : "default"}
      style={{ overflow: "hidden" }}
    >
      <Flex>
        {/* Image strip */}
        {doc.imageUrl && (
          <Box style={{ width: 80, minHeight: 72, flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${doc.imageUrl}?w=160&h=144&fit=crop&auto=format`}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>
        )}

        {/* Content — clickable to open */}
        <IntentLink
          intent="edit"
          params={{ id: doc._id, type: schemaType }}
          style={{
            flex: 1,
            textDecoration: "none",
            color: "inherit",
            minWidth: 0,
          }}
        >
          <Box padding={3} style={{ cursor: "pointer" }}>
            <Stack gap={2}>
              {/* Title row */}
              <Flex align="center" gap={2} wrap="wrap">
                {isPlanetMark && doc.emoji && <Text size={2}>{doc.emoji}</Text>}
                <Text
                  size={1}
                  weight="semibold"
                  style={{ wordBreak: "break-word" }}
                >
                  {primaryLabel}
                </Text>
                {(doc.featured || doc.highlighted) && (
                  <StarFilledIcon
                    style={{
                      color: "#f59e0b",
                      width: 14,
                      height: 14,
                      flexShrink: 0,
                    }}
                  />
                )}
              </Flex>

              {/* Subtitle */}
              {secondaryLabel && (
                <Text size={1} muted style={{ wordBreak: "break-word" }}>
                  {secondaryLabel.slice(0, 100)}
                  {secondaryLabel.length > 100 ? "…" : ""}
                </Text>
              )}

              <Flex align="center" gap={2} wrap="wrap">
                {doc.category && (
                  <Badge tone="primary" fontSize={0} padding={1}>
                    {doc.category}
                  </Badge>
                )}
                {isPlanetMark && doc.planet?.label && (
                  <Badge tone="default" fontSize={0} padding={1}>
                    {doc.planet.label}
                  </Badge>
                )}
                {doc.skills && doc.skills.length > 0 && (
                  <Flex gap={1} wrap="wrap">
                    {doc.skills.slice(0, 4).map((s) => (
                      <Badge key={s.name} fontSize={0} padding={1}>
                        {s.name}
                      </Badge>
                    ))}
                    {doc.skills.length > 4 && (
                      <Text size={0} muted>
                        +{doc.skills.length - 4}
                      </Text>
                    )}
                  </Flex>
                )}
                {date && (
                  <Text size={0} muted style={{ marginLeft: "auto" }}>
                    {date}
                  </Text>
                )}
              </Flex>
            </Stack>
          </Box>
        </IntentLink>

        {/* Delete controls */}
        <Flex align="center" gap={1} padding={2} style={{ flexShrink: 0 }}>
          {isConfirming ? (
            <Flex gap={1} direction="column">
              <Button
                tone="critical"
                mode="default"
                text="Delete"
                icon={TrashIcon}
                fontSize={0}
                padding={2}
                disabled={isDeleting}
                onClick={() => onDelete(doc._id)}
              />
              <Button
                mode="ghost"
                text="Cancel"
                fontSize={0}
                padding={2}
                onClick={onCancelConfirm}
              />
            </Flex>
          ) : (
            <Button
              tone="critical"
              mode="ghost"
              icon={TrashIcon}
              fontSize={1}
              padding={2}
              disabled={isDeleting}
              onClick={() => onConfirm(doc._id)}
            />
          )}
        </Flex>
      </Flex>
    </Card>
  );
}

export function QuickDeleteList({
  schemaType,
  orderField = "_createdAt desc",
}: Props) {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<Set<string>>(new Set());
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const query = QUERY(schemaType, orderField);

  useEffect(() => {
    client.fetch<Doc[]>(query).then((data) => {
      setDocs(data);
      setLoading(false);
    });
    const sub = client.listen(query).subscribe(() => {
      client.fetch<Doc[]>(query).then(setDocs);
    });
    return () => sub.unsubscribe();
  }, [query]);

  const handleDelete = useCallback(async (id: string) => {
    setDeleting((prev) => new Set(prev).add(id));
    setConfirmId(null);
    await writeClient.delete(id);
    setDocs((prev) => prev.filter((d) => d._id !== id));
    setDeleting((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  if (loading) {
    return (
      <Flex align="center" justify="center" padding={6}>
        <Spinner />
      </Flex>
    );
  }

  if (docs.length === 0) {
    return (
      <Flex align="center" justify="center" padding={6}>
        <Text muted>No documents yet.</Text>
      </Flex>
    );
  }

  return (
    <Box padding={4}>
      <Stack gap={2}>
        <Box paddingBottom={3}>
          <Text size={1} muted>
            {docs.length} item{docs.length !== 1 ? "s" : ""}
          </Text>
        </Box>
        {docs.map((doc) => (
          <DocRow
            key={doc._id}
            doc={doc}
            schemaType={schemaType}
            isDeleting={deleting.has(doc._id)}
            isConfirming={confirmId === doc._id}
            onDelete={handleDelete}
            onConfirm={setConfirmId}
            onCancelConfirm={() => setConfirmId(null)}
          />
        ))}
      </Stack>
    </Box>
  );
}
