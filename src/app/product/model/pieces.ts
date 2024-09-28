export interface IPiece {
    effectMonth: string;
    sectionId: number;
    sectionName: string;
    itemSummeries: ItemSummery[];
  }
  
  export interface ItemSummery {
    inDate: string;
    pieceRateItemName: string;
    pieceRateItemId: number;
    qty: number;
    productionPlanQty: number;
    rateTypeDatas: IRateTypeData[];
  }
  
  export interface IRateTypeData {
    pieceRateItemName: string;
    pieceRateItemId: number;
    qty: number;
    rateTypeName: string;
    rateTypeId: number;
  }