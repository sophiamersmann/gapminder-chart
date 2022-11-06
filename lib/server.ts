import fs from 'fs';
import path from 'path';

export function readFileSync(relativePath: string) {
  const absolutePath = path.join(process.cwd(), relativePath);
  return fs.readFileSync(absolutePath, 'utf8');
}
