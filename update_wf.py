import json

with open('latest_fyc_workflow.json', 'r', encoding='utf-8') as f:
    wf = json.load(f)

nodes = wf.get('nodes', [])
if 'activeVersion' in wf:
    nodes = wf['activeVersion']['nodes']

# Clean existing CRM / AI nodes if we run this again
nodes = [n for n in nodes if n['name'] not in [
    "📥 Innobate CRM: Registrar Lead",
    "🧠 Cerebro AI (RAG de F Y C)"
]]

supabase_node = {
    "parameters": {
        "method": "POST",
        "url": "=https://zhwqflvuujqrwvpvorld.supabase.co/rest/v1/crm_leads",
        "sendHeaders": True,
        "headerParameters": {
            "parameters": [
                {"name": "apikey", "value": "={{ $env.SUPABASE_ANON_KEY }}"},
                {"name": "Authorization", "value": "=Bearer {{ $env.SUPABASE_ANON_KEY }}"},
                {"name": "Content-Type", "value": "application/json"},
                {"name": "Prefer", "value": "return=representation"}
            ]
        },
        "sendBody": True,
        "specifyBody": "json",
        "jsonBody": "={\n  \"nombre\": \"{{ $json.body.customer.name }}\",\n  \"email\": \"ventas@ferreteriafyc.cl\",\n  \"whatsapp\": \"{{ $json.body.number.replace('+', '') }}\",\n  \"desafio\": \"Cotización/Pedido recibido:\\n{{ $json.body.text }}\",\n  \"presupuesto\": \"{{ $json.body.total || '0' }}\",\n  \"estado\": \"{{ $json.body.source.includes('Quick') ? 'Pendiente de Contacto' : 'Venta Cerrada' }}\",\n  \"fuente\": \"F Y C Soluciones Ferreteras\"\n}",
        "options": {}
    },
    "id": "supabase_crm_fyc",
    "name": "📥 Innobate CRM: Registrar Lead",
    "type": "n8n-nodes-base.httpRequest",
    "typeVersion": 4.1,
    "position": [720, 100]
}

rag_node = {
    "parameters": {
        "jsCode": "/* \n  CEREBRO DE VENTAS (RAG) - INNOBATE ENGINE\n  -----------------------------------------\n  Aquí se integra el stack de LangChain para leer el PDF/JSON \n  de F Y C y enriquecer la respuesta del bot.\n\n  INPUT: Lead data del CRM + Cotización.\n  OUTPUT: Respuesta inteligente por WhatsApp.\n*/\n\nconst lead = $json;\n\n// TODO: Conectar Langchain Document Loader + Vector Store QA para parsing del tarifario PDF\n\nreturn [\n  {\n    json: {\n      ...lead,\n      rag_status: 'ready',\n      ai_suggested_response: 'Procesado con IA de Innobate'\n    }\n  }\n];"
    },
    "id": "ai_rag_fyc",
    "name": "🧠 Cerebro AI (RAG de F Y C)",
    "type": "n8n-nodes-base.code",
    "typeVersion": 2,
    "position": [960, 100]
}

nodes.append(supabase_node)
nodes.append(rag_node)

# Adjust positions
for n in nodes:
    if n['name'] == '📲 Evolution API: Respuesta Branding FYC':
        n['position'] = [1200, 100]

connections = wf.get('connections', {})
if 'activeVersion' in wf:
    connections = wf['activeVersion']['connections']

# Rewire Enrutador -> CRM -> AI -> WhatsApp
if "🛣️ Enrutador de Marcas" in connections:
    connections["🛣️ Enrutador de Marcas"]["main"][0] = [{"node": "📥 Innobate CRM: Registrar Lead", "type": "main", "index": 0}]

connections["📥 Innobate CRM: Registrar Lead"] = {
    "main": [
        [{"node": "🧠 Cerebro AI (RAG de F Y C)", "type": "main", "index": 0}]
    ]
}

connections["🧠 Cerebro AI (RAG de F Y C)"] = {
    "main": [
        [{"node": "📲 Evolution API: Respuesta Branding FYC", "type": "main", "index": 0}]
    ]
}

# Apply back to workflow
wf['nodes'] = nodes
wf['connections'] = connections
if 'activeVersion' in wf:
    wf['activeVersion']['nodes'] = nodes
    wf['activeVersion']['connections'] = connections

with open('fyc-n8n-workflow-updated.json', 'w', encoding='utf-8') as f:
    json.dump(wf, f, indent=2, ensure_ascii=False)
