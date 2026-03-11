$ProgressPreference = 'SilentlyContinue'
$url = 'https://servicios-n8n-n8n.9barxf.easypanel.host/api/v1/workflows/ay5s4ejXmhpKgl8i'
$headers = @{
    'X-N8N-API-KEY' = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyOWMzZDA1Yi04NzA0LTQ3YzAtOTg2My1kNjIyNTA0MDI0ZTYiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiY2YyYzMyMDYtMTVhMC00YmJiLWI3OTktZWM0ZmE2OWI5YTIwIiwiaWF0IjoxNzcxNDg0NDY5fQ.wsSM-oIG2nZHK4B5t8nIJZbXsJaq-OpjjZvKK5xsDJY'
    'Content-Type' = 'application/json'
}

$workflow = Invoke-RestMethod -Uri $url -Method Get -Headers $headers

# Modificar Nodo 3: Evolution API FYC
$node3 = $workflow.nodes | Where-Object { $_.id -eq '3' }
$node3.parameters.url = '=https://infraestructura-whatsapp-agencia-evolution-api.9barxf.easypanel.host/message/sendText/FYC_Ferreteria'
$node3.parameters.jsonBody = '={"number": "{{ .body.number.replace(''+'', '''') }}","text": "👷‍♂️ *F Y C SOLUCIONES FERRETERAS*\n\nHola {{ .body.customer.name }}, ¡gracias por preferirnos!\n\nSoy de ventas de la ferretería y acabo de recibir tu solicitud. Estoy verificando disponibilidad en nuestra bodega central en este momento.\n\n*📋 Resumen de tu pedido:*\n{{ .body.text }}\n\nEn un momento te confirmo stock y alternativas de entrega.\n\n🌐 https://fyc-ferreteria-web.vercel.app/","delay": 1500,"presence": "composing"}'

# Guardar la configuracion en formato JSON con Depth adecuado
$jsonBody = $workflow | ConvertTo-Json -Depth 10 -Compress
$jsonBody = $jsonBody.Replace('\"', '\"')

# Hacer PUT 
$response = Invoke-RestMethod -Uri $url -Method Put -Headers $headers -Body $jsonBody
Write-Host "Success! Workflow Updated"
