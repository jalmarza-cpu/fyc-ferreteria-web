async function main() {
  const url = "https://tkqcbpizxsrffhygwxcg.supabase.co/rest/v1/productos?select=*&limit=1&apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrcWNicGl6eHNyZmZoeWd3eGNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODU5NzAyMCwiZXhwIjoyMDg0MTczMDIwfQ.nPj_9tDFp1sGmqcalo_xPfgBwXz_NRTN4et0w_XpWac";
  const res = await fetch(url);
  const data = await res.json();
  console.log(JSON.stringify(data[0], null, 2));
}
main();
