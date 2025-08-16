import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
import { generateClient } from 'aws-amplify/data';
// Update the import path below to the correct location of your resource file, or create the file if it doesn't exist.
import type { Schema } from '../../amplify/data/resource';
// If the file does not exist, run `amplify codegen models` or ensure the type is defined in your project.

const client = generateClient<Schema>();

dotenv.config();

const TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY;
if (!TELEGRAM_API_KEY) {
  throw new Error('Telegram API key is missing in the .env file');
}

const bot = new Telegraf(TELEGRAM_API_KEY);
bot.start(async (ctx) => {
  try {
    // Replace with actual model and method according to your schema
    const { data: userData } = await client.models.Todo.get({ id: ctx.from?.id?.toString() ?? '' });
    ctx.reply(`Welcome to ${process.env.GAME_NAME}, ${userData?.content || 'Player'}!`);
  } catch (error) {
    console.error('Error fetching user data:', error);
    ctx.reply('Welcome to the game!');
  }
});

bot.command('game', async (ctx) => {
  try {
    // Replace with actual model and method according to your schema
    // Replace 'Todo' with your actual model if you add a GameData model later
    const { data: todoData } = await client.models.Todo.get({ id: ctx.from?.id?.toString() ?? '' });
    ctx.reply(`You have ${todoData?.content ?? 0} coins. Play the game here: ${process.env.GAME_URL}`);
  } catch (error) {
    console.error('Error fetching game data:', error);
    ctx.reply(`Play the game here: ${process.env.GAME_URL}`);
  }
});

// Terms of Use command
bot.command('terms', (ctx) => {
  ctx.reply(`Read our terms of use here: ${process.env.TERMS_OF_USE_URL}`);
});

// Privacy Policy command
bot.command('privacy', (ctx) => {
  ctx.reply(`Read our privacy policy here: ${process.env.PRIVACY_POLICY_URL}`);
});

// Launch the bot
bot.launch().then(() => {
  console.log('Telegram bot is running');
}).catch((error) => {
  console.error('Error launching Telegram bot:', error);
});

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));