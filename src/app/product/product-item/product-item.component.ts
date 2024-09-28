import { Component, inject, OnInit } from '@angular/core';
import { ProductItemService } from '../service/product-item.service';
import { IPiece, ItemSummery } from '../model/pieces';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent implements OnInit{
  items:ItemSummery[] = [];
  productionData:any[] = [];
  
  private service:ProductItemService = inject(ProductItemService);
  ngOnInit(): void {
    this.service.getPiecesData()
                .pipe(tap(
                  (data:ItemSummery[])=>{
                    console.log(data);
                    this.items = data;
                   this.productionData =  this.tarnformJobCardData();

                   console.log("dg",this.productionData);
                   
              
                }))
                .subscribe();
                
  }
  tarnformJobCardData() {
    const result: any[] = [];
  
    this.items.forEach(item => {
      const existingItem = result.find(i => i.item === item.pieceRateItemName);
      const dateKey = item.inDate.split('T')[0];
      if (existingItem) {
       
  
        if (!existingItem[dateKey]) {
          existingItem[dateKey] = [];
        }
  
        existingItem[dateKey].push({
          productionQty: item.qty,
          rateQtys: item.rateTypeDatas.map((rate: any) => ({
            rateType: rate.rateTypeName,
            qty: rate.qty
          }))
        });
  
      
        existingItem.TotalQty += item.qty;
      } 
      
      else {
        const newItem: { item: string; PlanQty: number; TotalQty: number; [key: string]: any; } = {
          item: item.pieceRateItemName,
          PlanQty: item.productionPlanQty,
          TotalQty: item.qty
        };
  
        
        newItem[dateKey] = [
          {
            productionQty: item.qty,
            rateQtys: item.rateTypeDatas.map((rate: any) => ({
              rateType: rate.rateTypeName,
              qty: rate.qty
            }))
          }
        ];
  
        result.push(newItem);
      }
    });
     
        
       return result;
   
  }
  getUniqueDates(): string[] {
    const datesSet = new Set<string>();
    this.productionData.forEach(item => {
      Object.keys(item).forEach(key => {
        if (key.match(/^\d{4}-\d{2}-\d{2}$/)) {
          datesSet.add(key);
        }
      });
    });
    const shortedArray = Array.from(datesSet).sort();
    
    return shortedArray;
  }

}
