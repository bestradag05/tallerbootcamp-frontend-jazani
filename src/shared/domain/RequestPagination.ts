import type FilterPage from './FilterPage';

export default interface RequestPagination<T> extends FilterPage {
	filter?: T;
}
