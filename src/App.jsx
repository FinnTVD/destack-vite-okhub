/* eslint-disable no-unreachable */
import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";

export default function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100dvh" }}>
      <style>{`body { margin: 0 }`}</style>
      <StudioEditor
        options={{
          licenseKey:
            "24ba99ffa23a4f60af6e1cd1c860deb04bf02ddf43f546d8a432bf0da3c9c666",
          theme: "light",
          project: {
            type: "web",
            // TODO: replace with a unique id for your projects. e.g. an uuid
            id: "UNIQUE_PROJECT_ID",
          },
          identity: {
            // TODO: replace with a unique id for your end users. e.g. an uuid
            id: "UNIQUE_END_USER_ID",
          },
          assets: {
            storageType: "cloud",
          },
          storage: {
            type: "cloud",
            autosaveChanges: 100,
            autosaveIntervalMs: 10000,
          },
        }}
      />
    </div>
  );
}
