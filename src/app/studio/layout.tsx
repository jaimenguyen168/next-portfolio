export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <style>{`
        html, body {
          overflow: auto !important;
          height: auto !important;
        }
        main {
          height: auto !important;
          overflow-y: auto !important;
          scroll-snap-type: none !important;
          scroll-behavior: auto !important;
        }
      `}</style>
      {children}
    </>
  )
}
