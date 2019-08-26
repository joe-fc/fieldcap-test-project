import { Component, OnInit, Input } from '@angular/core';
import { AlphaVantageService } from '../alpha-vantage.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  public currency: string;

  public rate: string;

  constructor(private alphaVantageService: AlphaVantageService) { }

  ngOnInit() {
    // save a copy of the current context for use in the setInterval function below
	let that = this;
	// update the exchange rate for this currency immidiately
	that.updateExchangeRate(that.currency);
	// set a timer to update the exchange rate for this currency that fires every 1 minute 
    setInterval(() => {
		that.updateExchangeRate(that.currency);
    }, 60000);
  }
  
  updateExchangeRate(sCurrency) {
     this.alphaVantageService.get(this.currency).subscribe(result => {
       this.rate = result['Realtime Currency Exchange Rate']['5. Exchange Rate'];
     });
  }
  
}
