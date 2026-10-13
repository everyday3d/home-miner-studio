const HA_WS = "ws://192.168.1.207:8123/api/websocket";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI2ZjJmYjBiMTQ3N2I0ZTE1YTRlYmMzMTM3YTQ5MGFkNiIsImlhdCI6MTc5MTczMjA2MSwiZXhwIjoyMTA3MDkyMDYxfQ.2E2NIctiwetFayfE1-nUFJ1yOByJCIYO1crx28EaEAU";

const ws = new WebSocket(HA_WS);

ws.onopen = () => console.log("Connected");
ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.type === "auth_required") {
    ws.send(JSON.stringify({ type: "auth", access_token: TOKEN }));
  } else if (msg.type === "auth_ok") {
    ws.send(JSON.stringify({ id: 101, type: "hacs/repositories/list" }));
  } else if (msg.id === 101) {
    const custom = (msg.result || []).filter(r => r.custom || r.installed);
    console.log("Custom or installed repos count:", custom.length);
    console.log(JSON.stringify(custom.map(r => ({
      name: r.name,
      full_name: r.full_name,
      category: r.category,
      custom: r.custom,
      installed: r.installed,
      id: r.id
    })), null, 2));
    ws.close();
  }
};
setTimeout(() => ws.close(), 3000);
