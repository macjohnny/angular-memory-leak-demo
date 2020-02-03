# Angular App Memory Leaks

This repository shows some situations where memory leaks due to subscriptions to observables are created.
See more at https://slides.com/estebangehring/angular-app-memory-leak

## Usage

* Enable the desired example in `src/app/sub.component.ts`
* Run `ng serve` for a dev server. 
* Navigate to `http://localhost:4201/`. 
* Analyze the growth of the heap size in the developer tools
