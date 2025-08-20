import whatsapp from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import Xlsx from 'xlsx';
import path from 'path';
import fs from 'fs';

function getXlsxPath() {
  const isPkg = process.pkg !== undefined;  
  if (isPkg) {
    return path.join(process.cwd(), 'assets', 'CONTPREV.xlsx');
  } else {
    return path.resolve('./CONTPREV.xlsx');
  }
}

class App {
  client;
  data = []

  constructor() {
    this.client = new whatsapp.Client({
      authStrategy: new whatsapp.LocalAuth(),
      puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      }
    });
  }

  getData() {
    const { readFile, utils } = Xlsx;
    const filePath = getXlsxPath();

    if (!fs.existsSync(filePath)) {
      console.error("Arquivo XLSX não encontrado:", filePath);
      return;
    }

    const file = readFile(filePath);

    const sheets = file.SheetNames;
    for (let i = 0; i < sheets.length; i++) {
      const temp = utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
      temp.forEach((res) => {
        const phone = `${res.TELEFONE}`.trim().split(" ").join("").replace(/\D/g, '');
        if (phone.length && res.MENSAGEM) {
           this.data.push({phone: `55${phone}@c.us`, message: res.MENSAGEM})
          };
      });
    }

  }

  async startWpp() {
    await this.client.initialize();
    
    this.client.on('Go', async () => {
        for (const lead of this.data) {
          try {
            await this.client.sendMessage(lead.phone, lead.message);
            console.log(`Mensagem enviada com sucesso para ${lead.phone}`);
          } catch (error) {
            console.error(`Error: ${lead}:`, error);
          }
        }
    });

    this.client.on('qr', qr => {
      qrcode.generate(qr, { small: true });
    });
  }
}

const app = new App();
app.getData();
app.startWpp();
