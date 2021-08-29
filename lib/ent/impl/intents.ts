import { Intents } from '../const/discord/intents';

export default function intentCalculator(intents: Intents[]) {
	return intents.reduce((a, b) => a + b);
}
