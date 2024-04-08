

interface IPage {
  [key: string]: number | string;
}

export class PaginationHelper {

  private collection: (number[] | string[]);
  private itemsPerPage: number;

  private paginatedCollection: IPage[];

	constructor(collection: number[] | string[], itemsPerPage: number) {
    this.collection = collection
    this.itemsPerPage = itemsPerPage
    this.paginatedCollection = this.createPaginatedCollection();
	}

	public itemCount = (): number => {
	  // returns the number of items within the entire collection

    return this.collection.length;
	}

	public pageCount = (): number  => {
	  // returns the number of pages

    return Math.ceil(this.collection.length / this.itemsPerPage)
	}

	public pageItemCount = (pageIndex: number): number => {
	  // returns the number of items on the current page. page_index is zero based.
	  // this method should return -1 for pageIndex values that are out of range

    return this.paginatedCollection[pageIndex] ? Object.keys(this.paginatedCollection[pageIndex]).length : -1
	}

	public pageIndex = (itemIndex: number): number => {
	  // determines what page an item is on. Zero based indexes
	  // this method should return -1 for itemIndex values that are out of range

    if (itemIndex < 0 || itemIndex >= this.itemCount()) {
      return -1;
    }

    return Math.floor(itemIndex / this.itemsPerPage);
	}

  private createPaginatedCollection = (): IPage[] => {
    const paginatedCollection: IPage[] = []

    let itemCounter = 0;
    for (let i = 0; i < this.pageCount(); i++) {
      let page: IPage = {}
      for (let j = 0; j < this.itemsPerPage; j++) {
        if (itemCounter === this.itemCount()) {
          break;
        }
        page[itemCounter] = itemCounter++;
      }
      paginatedCollection.push(page);
    }

    return paginatedCollection
  }
}