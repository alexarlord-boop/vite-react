
export function generateFrontendDockerfile(data) {
    return `
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN ${data.buildCommand || 'npm run build'}
EXPOSE ${data.port || '3000'}
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
 `.trim();
}

export function generateBackendDockerfile(data) {
    return `
FROM python:3.9-slim
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
EXPOSE ${data.port || '5000'}
CMD ["python", "app.py"]
 `.trim();
}

export function generateDatabaseDockerfile(data) {
    const envVars = data.env_var.split(',').map((env) => `ENV ${env}`).join('\n');
    return `
FROM ${data.db_type.includes(':') ? data.db_type : `${data.db_type}:latest`}
ENV POSTGRES_HOST=${data.host || 'localhost'}
${envVars}
VOLUME ${data.storage_volume || '/var/lib/postgresql/data'}
EXPOSE ${data.port || '5432'}
CMD ["postgres"]
    `.trim();
}