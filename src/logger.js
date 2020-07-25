export default class CustomLogger{
	disabled = false;
	msgColor = '';
	title = {
		name : '',
		color : ''
	}
	constructor(){
		((win) => {
			let nCon = win.console ; 
			let loggerDiv = document.getElementById('app');
			// nCon.log = (input) => {
			// 	if( typeof input === 'object' ){
			// 		loggerDiv.innerHTML += ` ${JSON.stringify(input)} ` ;
			// 	} else{
			// 		loggerDiv.innerHTML += ` ${String(input)} ` ;
			// 	}
			// }
			let con = win.console  = {};	// win.console is empty now
			let showLog = (...input)=> {
					if( typeof input === 'object' ){
					loggerDiv.innerHTML += ` ${JSON.stringify(input)} ` ;
				} else{
					loggerDiv.innerHTML += ` ${String(input)} ` ;
				}
			}
			for( let p in nCon ){
				if( typeof nCon[p] === 'function' ){
					con[p] = (fn => {
						return function(){
							nCon[p].showLog = showLog;
							nCon[p].showLog(arguments[0]);
							nCon[p].apply( nCon, arguments );
						}
					})(p)
				}
			}
		})(window)
	}

	log( input = '' ){
		if( this.isEnabled() === true ){
			console.log( `%c ${this.title.name} | %c${input} | %c${new Date()}`,
			`color: ${this.title.color}; font-size : x-large`,
			`color: ${this.msgColor}; font-size : x-large`, `` );
		}		
	}
	isEnabled(){
		return this.disabled === false ;
	}
	setEnabled(){
		this.disabled = false;
	}
	setDisabled(){
		this.disabled = true;
	}
	setColor(color = 'blue'){
		this.msgColor = color;
	}
	setTitle({name, color}){
		this.title.name = name ;
		this.title.color = color ; 
	}
}