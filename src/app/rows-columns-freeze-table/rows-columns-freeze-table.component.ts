import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductItemService } from '../product/service/product-item.service';
import { ItemSummery } from '../product/model/pieces';
import { producerAccessed } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-rows-columns-freeze-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rows-columns-freeze-table.component.html',
  styleUrl: './rows-columns-freeze-table.component.scss'
})
export class RowsColumnsFreezeTableComponent implements OnInit{
  jobCardData:ItemSummery[] = [];
 transFormedJobCardData:any[] = [];
  private service:ProductItemService = inject(ProductItemService);
  ngOnInit(): void {
    this.service.getPiecesData()
                .subscribe({
                  next:(result:ItemSummery[])=>{
                      this.jobCardData = result;
                      console.log(this.jobCardData);
                      this.transFormedJobCardData = this.getTransformJobCardData();
                     console.log("ff",this.getUniqueDates());
                     
                     
                  }
                })
  }

  getUniqueDates(): string[] {
    const datesSet = new Set<string>();
    this.transFormedJobCardData.forEach(item => {
      //console.log("item",item)
      Object.keys(item).forEach(key => {
        if (key.match(/^\d{4}-\d{2}-\d{2}$/)) {
          datesSet.add(key);
        }
      });
    });
     const shortedArray = Array.from(datesSet).sort();
     console.log('shorted: ',shortedArray);
     
    return shortedArray;
  }
  getTransformJobCardData():any[]{
    const result: any[] = [];
    this.jobCardData.forEach(summary=>{
      console.log("summary: ",summary)
       const existingItem = result.find(x=>x.item === summary.pieceRateItemName);
       console.log("ex",existingItem);
       const dateKey = summary.inDate.split('T')[0];
       console.log("dateKey: ",dateKey);
       
       if(existingItem){
       
        if(!existingItem[dateKey]){
            existingItem[dateKey] = [];
        }
        existingItem[dateKey].push({
          productionQty:summary.qty
        })
        existingItem.TotalQty += summary.qty;
       }
       else{
     
        const newItem:{ item: string; PlanQty: number; TotalQty: number; [key: string]: any} = {
          item:summary.pieceRateItemName,
          PlanQty:summary.productionPlanQty,
          TotalQty: summary.qty
        };
        
        newItem[dateKey] = [
          {
            productionQty:summary.qty
          }
        ];
        result.push(newItem);
       }
    });
    return result;
    
  }
  
}
