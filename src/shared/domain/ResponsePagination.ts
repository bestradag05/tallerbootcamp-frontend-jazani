export default interface ResponsePagination<T> {
	from: number;
	to: number;
	perPage: number;
	currentPage: number;
	lastPage: number;
	total: number;
	data: T[];
}
