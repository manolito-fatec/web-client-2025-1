#!/bin/bash

echo "📦 Instalando dependências..."
npm install

echo "🚀 Construindo projeto..."
npm run build

echo "📂 Movendo arquivos para o destino..."
cp -r dist/* /opt/tomcat/webapps/web-client 

echo "✅ Deploy concluído!"