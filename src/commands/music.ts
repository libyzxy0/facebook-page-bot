import { Innertube, UniversalCache, Utils } from "youtubei.js";

export const config = {
  name: 'Music',
  description: 'Command that lets you play any of your favorite music.',
  usage: 'Music [title]',
  category: 'General',
  creator: 'libyzxy0'
};

export async function execute({
  api, event
}) {
  const args = event.message.text.split(" ");
  
  if (args.length < 2) {
    return api.sendMessage(
      {text:`⚠️Invalid Use Of Command!\n💡Usage: Music [title]`},
      event.sender.id,
    );
  }
    
  try {
    args.shift();
    api.setTypingIndicator(event.sender.id, true);
      
    const yt = await Innertube.create({
        cache: new UniversalCache(false),
        generate_session_locally: true,
      });
      const search = await yt.music.search(args.join(" "), { type: "video" });
      if (search.results[0] === undefined) {
        await api.sendMessage({ text: "Audio not found!"}, event.sender.id);
      } else {
        await api.sendMessage({ text: `🔍 Searching for the music ${args.join(" ")}.` }, event.sender.id);
      }
      const info = await yt.getBasicInfo(search.results[0].id);
      
      const url = info.streaming_data?.formats[0].decipher(yt.session.player);
      
      await api.sendMessage({
      attachment: {
        type: 'audio',
        payload: {
          url: url,
          is_reusable: true
        }
      }
    }, event.sender.id);

  } catch (error) {
    console.error(`Error: ${error}`);
    await api.sendMessage({
      text: "Error, please contact the developer."
    }, event.sender.id);
  } finally {
    api.setTypingIndicator(event.sender.id, false);
  }
}