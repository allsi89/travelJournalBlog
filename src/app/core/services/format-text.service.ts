import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FormatTextService {
    constructor() { }

    // formatToDisplay(text) {
    //     return text
    //         .split('\n')
    //         .map(elem => {
    //             if (!elem) {
    //                 return '<br>';
    //             } else {
    //                 return '<p>'.concat(elem, '</p>');
    //             }
    //         })
    //         .join('');
    // }

    // formatToEdit(text) {
    //     return text
    //         .replace('<br>', '\n')
    //         .replace('</p>', '\n')
    //         .replace('<p>', '\n');
    // }

}