import { v4 as uuidv4 } from 'uuid';
import tagApi from './Tag';

export function generateId() {
	return uuidv4();
}

export { tagApi };
