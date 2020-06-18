import { Author } from "./author";

export interface Article {
    pmid: number;
    articleTitle: string;
    journal: string;
    publicationDate: Date;
    revisionDate: Date;
    articleAbstract: String;
    pubmedUrl: string;
    keywordsList: string;
    authorsList: Author[]


}
