"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exampleAction = {
    type: 'FETCH_LIBRAS_DATA',
    nameWord: 'example',
    wordDefinitions: [
        {
            descriptionWordDefinition: 'An example definition',
            src: 'example.jpg',
            category: {
                nameCategory: 'Example Category',
                descriptionCategory: 'An example category description',
            },
        },
    ],
};
var typedExampleAction = exampleAction;
console.log(typedExampleAction); // Aqui você verá a tipagem de typedExampleAction
