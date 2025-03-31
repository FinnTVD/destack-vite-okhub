/* eslint-disable no-unreachable */
import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";

export default function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100dvh" }}>
      <style>{`body { margin: 0 }`}</style>
      <StudioEditor
        options={{
          licenseKey: "YOUR_LICENSE_KEY",
          project: { type: "web" },
          assets: {
            storageType: "self",
            onUpload: async ({ files }) => {
              try {
                const body = new FormData();
                files.forEach((file) => body.append("files", file));

                const response = await fetch("http://localhost:5555/upload", {
                  method: "POST",
                  body,
                });

                if (!response.ok) {
                  throw new Error("Upload failed");
                }

                return await response.json();
              } catch (error) {
                console.error("Upload error:", error);
                return [];
              }
            },
            onDelete: async ({ assets }) => {
              try {
                await fetch("http://localhost:5555/delete", {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(assets),
                });
              } catch (error) {
                console.error("Delete error:", error);
              }
            },
          },
          storage: {
            type: "self",
            onSave: async ({ project }) => {
              try {
                await fetch("http://localhost:5555/save", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ project }),
                });
              } catch (error) {
                console.error("Save error:", error);
              }
            },
            onLoad: async () => {
              try {
                const response = await fetch("http://localhost:5555/load");

                if (!response.ok) {
                  throw new Error("Load failed");
                }

                const { project } = await response.json();
                return { project };
              } catch (error) {
                console.error("Load error:", error);
                return { project: null };
              }
            },
            autosaveChanges: 100,
            autosaveIntervalMs: 10000,
          },
        }}
      />
    </div>
  );
}
