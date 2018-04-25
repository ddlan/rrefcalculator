function findRREF() {
	var input = document.getElementById("inputform");
	var text = "";

	// Filling out input matrix
	var matrix = new Array(9);
	for (var i = 0; i < input.length; i++) {
		if (input.elements[i].value == "") {
			text = "Please fill out the matrix!";
			document.getElementById("ans").innerHTML = text;
			return;
		}
		matrix[i] = input.elements[i].value;
	}

	// Gauss-Jordan Elimination Algorithm
	var col = 0;
	for (var i = 0; i < 9; i += 3) {
		var start = i + col; // starting index to get leading one
		if (!(matrix[start] == 0)) {
			for (var j = start + 1; j % 3 > 0; j++) {
				matrix[j] /= matrix[start];
			}
			matrix[start] = 1;
			for (var j = start + 3; j < 9; j += 3) { // check rows below
				var div = matrix[j] / matrix[start];
				for (var k = 1; (j + k) % 3 > 0; k++) {
					matrix[j + k] -= div * matrix[start + k];
				}
				matrix[j] -= div * matrix[start];
			}
			for (var j = start - 3; j > 0; j -= 3) { // check rows above
				var div = matrix[j] / matrix[start];
				for (var k = 1; (j + k) % 3 > 0; k++) {
					matrix[j + k] -= div * matrix[start + k];
					break;
				}
				matrix[j] -= div * matrix[start];
			}
			col++;
		}
	}

	// Swapping rows back up top
	var emptyrow = 0;
	for (var i = 0; i < 9; i += 3) {
		if (matrix[i + emptyrow] > 0) {
			for (var j = 0; j % 3 > 0 || j == 0; j++) {
				var temp = matrix[j + emptyrow * 3];
				matrix[j + emptyrow * 3] = matrix[j + i];
				matrix[j + i] = temp;
			}
			emptyrow++;
		}
	}

	// Output
	for (var i = 0; i < input.length; i++) {
		text += matrix[i];
		if ((i-2)%3 == 0) text += "<br>";
		else text += " ";
	}
	document.getElementById("ans").innerHTML = text;
}