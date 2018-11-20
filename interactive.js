window.onload = function () {


	'use strict';



	var questionElementsHeight = document.querySelector('.question-adj-height');
	var interactiveElementsHeight = document.querySelector('.interactive-adj-height');
	var controlsElementsHeight = document.querySelector('.controls-adj-height');

	var btnNext = document.querySelectorAll('.btn-click-next');
	var btnPrev = document.querySelectorAll('.btn-click-prev');
	var btnStart = document.querySelectorAll('.btn-click-start');
	var answer = document.querySelectorAll('.answer-field');

	var firstFlag = true;

	var scriptOfAnswer = {
		counter: 0,
		bool: [
			[true, true, true],
			[true, true, true],
			[true, true, true],
			[true, true, true],
		],
		sel: [questionElementsHeight, interactiveElementsHeight, controlsElementsHeight]
	};




	setMaxHeight(questionElementsHeight, interactiveElementsHeight, controlsElementsHeight);




	(function () { //Вешаем слушатели
		for (var l = 0; l < btnNext.length; l++) {
			btnNext[l].addEventListener('click', function () {
				changeField();
			});
		}

		for (var w = 0; w < btnPrev.length; w++) {
			btnPrev[w].addEventListener('click', function () {
				changeFieldPrev();
			});
		}
		for (var m = 0; m < btnStart.length; m++) {
			btnStart[m].addEventListener('click', function () {
				changeFieldStart();
			});
		}

		for (var k = 0; k < answer.length; k++) {
			answer[k].addEventListener('click', checkAnswer);
		}


	})()






	function changeFieldStart() { //Вернуть поля в начальное положение
		for (var i = 0; i < scriptOfAnswer.sel.length; i++) {

			if (scriptOfAnswer.bool[scriptOfAnswer.counter][i]) {
				var childElement = scriptOfAnswer.sel[i].children;
				for (var k = 0; k < childElement.length; k++) {
					if (childElement[k].classList.contains('op')) {
						childElement[0].classList.add('dis', 'op');
						childElement[k].classList.remove('dis', 'op');
						break;
					}
				}
			}
		}
		scriptOfAnswer.counter = 0;
		resetAnswer(); //Очищаем все ответы
	}

	function changeFieldPrev() { //Поменять поля на предыдущие
		for (var i = 0; i < scriptOfAnswer.sel.length; i++) {

			if (scriptOfAnswer.bool[scriptOfAnswer.counter][i]) {
				var childElement = scriptOfAnswer.sel[i].children;
				for (var k = 0; k < childElement.length; k++) {
					if (childElement[k].classList.contains('op')) {
						childElement[k].previousElementSibling.classList.add('dis', 'op');
						childElement[k].classList.remove('dis', 'op');
						break;
					}
				}
			}
		}
		scriptOfAnswer.counter--;
		resetAnswer(); //Очищаем все ответы
	}

	function changeField() { //Поменять поля на следующие
		for (var i = 0; i < scriptOfAnswer.sel.length; i++) {

			if (scriptOfAnswer.bool[scriptOfAnswer.counter][i]) {
				var childElement = scriptOfAnswer.sel[i].children;
				for (var k = 0; k < childElement.length; k++) {
					if (childElement[k].classList.contains('op')) {
						childElement[k].nextElementSibling.classList.add('dis', 'op');
						childElement[k].classList.remove('dis', 'op');
						break;
					}
				}
			}
		}
		scriptOfAnswer.counter++;
	}

	function checkAnswer() { //Ответ на вопрос
		this.classList.add('op');
		if (this.firstElementChild.getAttribute('src') === 'yes.png') {
			setTimeout(function () {
				changeField();
			}, 800);
		}
	}

	function resetAnswer() { //Очистить поля с ответами
		for (var k = 0; k < answer.length; k++) {
			answer[k].classList.remove('op');
		}
	}





	function setFirstElement() { //Показываем первые элементы
		for (var k = 0; k < arguments.length; k++) {
			var childElement = arguments[k].children;
			for (var i = 0; i < childElement.length; i++) {
				if (!(i === 0)) {
					childElement[i].style.display = 'none';
				} else {
					childElement[i].classList.add('dis', 'op');
				}
			}
		}
		firstFlag = false;
	}

	function setDisplay() {
		for (var k = 0; k < arguments.length; k++) {
			var childElement = arguments[k].children;
			for (var i = 0; i < childElement.length; i++) {
				childElement[i].style.display = 'block';
			}
		}
		setMaxHeight(questionElementsHeight, interactiveElementsHeight, controlsElementsHeight);	
	}

	function setNextElements() {
		for (var k = 0; k < arguments.length; k++) {
			var childElement = arguments[k].children;
			for (var i = 0; i < childElement.length; i++) {
				if (!childElement[i].classList.contains('op')) {
					childElement[i].style.display = 'none';
				} 
			}
		}
	}


	//Выравнивание элементов по высоте

	function setMaxHeight() {
		for (var i = 0; i < arguments.length; i++) {
			var childElement = arguments[i].childNodes;
			var maxHeight = 0;
			for (var k = 0; k < childElement.length; k++) {
				var heightBlock = childElement[k].clientHeight;
				if (heightBlock > maxHeight) {
					maxHeight = heightBlock;
				}
			}
			arguments[i].style.height = maxHeight + 'px';
		}
		if (firstFlag) {
			setFirstElement(questionElementsHeight, interactiveElementsHeight, controlsElementsHeight);
		}else{
			setNextElements(questionElementsHeight, interactiveElementsHeight, controlsElementsHeight);
		}
	}

	window.onresize = function () {
		//window.onload = function () {
			setDisplay(questionElementsHeight, interactiveElementsHeight, controlsElementsHeight);
		//}
	}
	//Выравнивание элементов по высоте end



};