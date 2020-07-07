import { GeolocService } from '../service/geoloc.service';
import { Author } from './author';

export class Geoloc {
    public static fromJson(json: Object): Geoloc {
        return new Geoloc(
            json['_id'],
            json['articlePmid'],
            json['articleTitle'],
            json['journal'],
            new Date(json['revisionDate']),
            json['articleAbstract'],
            json['pubmedUrl'],
            json['keywordsList'],
            json['authorLastName'],
            json['authorForeName'],
            json['affiliationPubmed'],
            json['googleFormatedAdress'],
            json['authorEmail'],
            json['latitude'],
            json['longitude'],
            json['authorsList']
        )
    }

    constructor( 
        public _id:number,
        public articlePmid:number,
        public articleTitle: string,
        public journal: string,
        public revisionDate: Date,
        public articleAbstract: String,
        public pubmedUrl: string,
        public keywordsList: string,
        public authorLastName: string,
        public authorForeName: string,
        public affiliationPubmed: string,
        public googleFormatedAdress: string,
        public authorEmail: string,
        public latitude: number,
        public longitude: number,
        public authorsList: Author[]) {}

    // articlePmid:number;
    // articleTitle: string;
    // journal: string;
    // revisionDate: Date;
    // articleAbstract: String;
    // pubmedUrl: string;
    // keywordsList: string;
    // authorLastName: string;
    // authorForeName: string;
    // affiliationPubmed: string;
	// googleFormatedAdress: string;
	// authorEmail: string;
    // // authorsList: Author[]
    // latitude: number;
    // longitude: number;
}
