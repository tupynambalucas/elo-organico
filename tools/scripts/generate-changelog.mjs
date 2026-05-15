import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RELEASES_DIR = path.join(__dirname, '../../knowledge-base/releases');
const CHANGELOG_PATH = path.join(__dirname, '../../CHANGELOG.md');

function generateChangelog() {
  console.log('🔄 Verificando novos releases na base de conhecimento...');

  if (!fs.existsSync(RELEASES_DIR)) {
    console.error(`❌ Diretório de releases não encontrado: ${RELEASES_DIR}`);
    process.exit(1);
  }

  // Pega todos os arquivos markdown da pasta releases e ordena do mais novo para o mais velho (pelo nome YYYY-MM-DD)
  const files = fs.readdirSync(RELEASES_DIR)
    .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
    .sort((a, b) => b.localeCompare(a));

  if (files.length === 0) {
    console.log('ℹ️ Nenhum arquivo de release encontrado.');
    return;
  }

  let changelogContent = '# Changelog\n\nTodas as atualizações, melhorias e novos recursos do Elo Orgânico documentados na Base de Conhecimento.\n\n';

  for (const file of files) {
    const filePath = path.join(RELEASES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Extrai o frontmatter
    const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (match) {
      const frontmatter = match[1];
      const body = match[2];

      // Tenta achar titulo e data dentro do frontmatter
      const titleMatch = frontmatter.match(/title:\s*(.+)/);
      const dateMatch = frontmatter.match(/date:\s*(.+)/);

      const title = titleMatch ? titleMatch[1].replace(/['"]/g, '').trim() : file;
      const date = dateMatch ? dateMatch[1].replace(/['"]/g, '').trim() : '';

      changelogContent += `## ${title} ${date ? `(${date})` : ''}\n\n`;
      changelogContent += `${body.trim()}\n\n---\n\n`;
    } else {
      // Se não tiver frontmatter, usa o nome do arquivo
      changelogContent += `## ${file}\n\n${content.trim()}\n\n---\n\n`;
    }
  }

  fs.writeFileSync(CHANGELOG_PATH, changelogContent);
  console.log(`✅ CHANGELOG.md gerado com sucesso na raiz do projeto! (${files.length} releases compilados)`);
}

generateChangelog();
