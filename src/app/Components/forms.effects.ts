// import { Injectable } from '@angular/core';

// import { mergeMap, map, switchMap } from 'rxjs/operators';
// import { MockApiService } from '../Services/mock-api.service';

// @Injectable()
// export class FormsEffects {
//   constructor(private actions$: Actions, private api: MockApiService) {}

//   load$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(FormsActions.loadTemplates),
//       mergeMap(() =>
//         this.api.getTemplates().pipe(
//           map(templates => FormsActions.loadTemplatesSuccess({ templates }))
//         )
//       )
//     )
//   );

//   save$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(FormsActions.addOrUpdateTemplate),
//       switchMap(({ template }) =>
//         this.api.saveTemplate(template).pipe(
//           map(() => FormsActions.loadTemplates())
//         )
//       )
//     )
//   );

//   delete$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(FormsActions.deleteTemplate),
//       mergeMap(({ id }) =>
//         this.api.deleteTemplate(id).pipe(
//           map(() => FormsActions.loadTemplates())
//         )
//       )
//     )
//   );
// }
// function createEffect(arg0: () => any) {
//     throw new Error('Function not implemented.');
// }

