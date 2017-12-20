window.onload = function(){
	var item = document.getElementById('h_l_h').getElementsByTagName('div');
	for (var i = 0; i < item.length; i++) {
		item[i].index = i;
		item[i].onclick = function(){
			for (var j = 0; j < item.length; j++) {
				item[j].getElementsByTagName('a')[0].className = '';
			}
			this.getElementsByTagName('a')[0].className = 'seleced';
			var h_address = document.getElementById('h_address');
			h_address.innerHTML = item[this.index].innerHTML;
		}
	}
	document.querySelector('#login').onclick = function(){
		window.open('http://10.0.156.234:8888/login.html','_self');
	};
	document.querySelector('#register').onclick = function(){
		window.open('http://10.0.156.234:8888/register.html','_self');
	};
};
