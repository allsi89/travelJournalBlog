import {Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'formatText',
    pure: false
})
export class FormatTextPipe implements PipeTransform {
    transform(text: string) {
        return text
        .split('\n')
        .map(elem => {
            if (!elem) {
                return '<br>';
            } else {
                return '<p>'.concat(elem, '</p>');
            }
        })
        .join('');
    }

}