export interface IMakeCreateModel {
	validateModel: (data: any) => void;
	generateId: () => string;
}
