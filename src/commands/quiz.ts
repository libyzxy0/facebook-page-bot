import axios from "axios";
import { fontText } from '@/utils/fonts';

export const config = {
  name: 'Quiz',
  description: 'Quiz command to test your knowledge.',
  usage: 'Quiz',
  category: 'Education',
  creator: 'libyzxy0'
};

export function handlePostBack({ api, payload, event }) {
  api.sendMessage({
    text: `${fontText('Your answer', 'sansSerifItalic')} ${fontText(payload.choosen, 'bold')} is ${payload.isCorrect ? fontText('Correct', 'sansSerifItalic') : `${fontText('Incorrect, the correct answer is', 'sansSerifItalic')} ${fontText(payload.correctAnswer, 'bold')}`}`
  }, event.sender.id);
}

export async function execute({ api, event }) {
  try {
    api.setTypingIndicator(event.sender.id, true);

    const response = await axios.get('https://the-trivia-api.com/v2/questions', { timeout: 10000 });
    
    const data = response.data[Math.floor(Math.random() * response.data.length)];
    
    const answers = [...data.incorrectAnswers.slice(0, 2), data.correctAnswer];
    
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }

    const choices = answers.map(answer => ({
      type: "postback",
      title: answer,
      payload: JSON.stringify({
        commandName: config.name.toLowerCase(),
        isCorrect: data.correctAnswer === answer,
        correctAnswer: data.correctAnswer,
        choosen: answer
      })
    }));

    await api.sendMessage({
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: `${fontText("Random Quiz", "bold")}\n\n${fontText("Category", "sansSerifBold")}: ${fontText(data.category, "sansSerifItalic")}\n${fontText("Difficulty", "sansSerifBold")}: ${fontText(data.difficulty, "sansSerifItalic")}\n\n${fontText(data.question.text, "sansSerifItalic")}`,
          buttons: choices
        }
      }
    }, event.sender.id);

  } catch (error) {
    console.error(`Error: ${error.message}`);
    await api.sendMessage({
      text: "Error, please contact the developer."
    }, event.sender.id);
  } finally {
    api.setTypingIndicator(event.sender.id, false);
  }
}
