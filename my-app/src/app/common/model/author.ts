import { Affiliation } from './affiliation';

export interface Author {

    lastName: string;
	foreName: string;
	affiliation1: Affiliation;
	affiliation2: Affiliation;
	email: string;
}
