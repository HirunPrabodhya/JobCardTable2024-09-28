import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'jobcards',
        loadComponent:()=>import('./product/product-item/product-item.component')
                            .then(j=>j.ProductItemComponent)
    },
    {
        path:'freezeTable',
        loadComponent:()=>import('./rows-columns-freeze-table/rows-columns-freeze-table.component')
                            .then(f=>f.RowsColumnsFreezeTableComponent)
    },
    {
        path:'',
        redirectTo:'jobcards',
        pathMatch:'full'
    },
    {
        path:'**',
        loadComponent:()=>import('./page-not-found/page-not-found.component')
                                .then(n=>n.PageNotFoundComponent)
    }
];
