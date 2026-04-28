import { useState, useRef, useEffect } from "react";
import { set, unset, type StringInputProps } from "sanity";
import { SKILLS_LIST } from "../constants/skills";

export function SkillAutocompleteInput(props: StringInputProps) {
  const { value, onChange } = props;

  const currentTitle = SKILLS_LIST.find((s) => s.value === value)?.title ?? "";
  const [query, setQuery] = useState(currentTitle);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? SKILLS_LIST.filter((s) =>
        s.title.toLowerCase().includes(query.toLowerCase())
      )
    : [...SKILLS_LIST];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        // If the user typed something that doesn't match a selection, reset to last valid value
        setQuery(SKILLS_LIST.find((s) => s.value === value)?.title ?? "");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value]);

  function handleSelect(skill: { title: string; value: string }) {
    setQuery(skill.title);
    onChange(set(skill.value));
    setOpen(false);
  }

  function handleClear() {
    setQuery("");
    onChange(unset());
    setOpen(true);
  }

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
      {/* Input row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "var(--card-bg, #1a1a1a)",
          border: "1px solid var(--card-border, #333)",
          borderRadius: 4,
          padding: "6px 10px",
          gap: 8,
        }}
      >
        <input
          type="text"
          value={query}
          placeholder="Type to search skills…"
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            if (!e.target.value) onChange(unset());
          }}
          onFocus={() => setOpen(true)}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "inherit",
            fontSize: 14,
          }}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#888",
              fontSize: 16,
              lineHeight: 1,
              padding: 0,
            }}
          >
            ×
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && filtered.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            maxHeight: 260,
            overflowY: "auto",
            margin: 0,
            padding: 0,
            listStyle: "none",
            background: "#1e1e1e",
            border: "1px solid #333",
            borderRadius: 4,
            zIndex: 9999,
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          {filtered.map((skill) => (
            <li
              key={skill.value}
              onMouseDown={(e) => {
                e.preventDefault(); // prevents blur before click fires
                handleSelect(skill);
              }}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                fontSize: 14,
                color: skill.value === value ? "#fff" : "#ccc",
                background: skill.value === value ? "#2a2a2a" : "transparent",
                borderLeft: skill.value === value ? "2px solid #6c47ff" : "2px solid transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLLIElement).style.background = "#2a2a2a";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLLIElement).style.background =
                  skill.value === value ? "#2a2a2a" : "transparent";
              }}
            >
              {skill.title}
            </li>
          ))}
        </ul>
      )}

      {/* No results */}
      {open && filtered.length === 0 && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            padding: "10px 12px",
            background: "#1e1e1e",
            border: "1px solid #333",
            borderRadius: 4,
            color: "#888",
            fontSize: 13,
            zIndex: 9999,
          }}
        >
          No skills match &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}
