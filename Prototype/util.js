function AwsIcon(name, image, coordinate, grid, width, height, isMenuIcon){
	this._name = name;
	this._image = image;
	this._coordinate = new Coordinate(coordinate.x, coordinate.y);
	this._grid = new Coordinate(grid.x, grid.y);
	this._width = width;
	this._height = height;
	this._isMenuIcon = isMenuIcon; // only menu item can be copied
	this._connectedIcon = [];
	this._zIndex = 0;
}

function Coordinate(x, y){
	this.x = x;
	this.y = y;
	this.log = function(){
		console.log('Coordinate : ( ' + x + ', ' +  y + ')');
	}
}

function distanceCoordinate(co1, co2) {
	return Math.sqrt((co1.x-co2.x)*(co1.x-co2.x)+(co1.y-co2.y)*(co1.y-co2.y));
}

function settingRealCoordinate(awsIcon, canvasAreaWidth, iconMargin, iconWidth, iconHeight){
	var coor = convertCoordinateFromGrid(awsIcon._coordinate.x, awsIcon._coordinate.y, canvasAreaWidth, iconMargin, iconWidth, iconHeight);
	awsIcon._coordinate = coor;
}

function drawImageToCanvas(context, awsIcon) {
	context.drawImage(awsIcon._image, awsIcon._coordinate.x, awsIcon._coordinate.y);
}

function getMousePosition(ev){
	if ( ev.layerX ||  ev.layerX == 0) { // Firefox & chrome
		mx= ev.layerX;
		my = ev.layerY;
	} else if (ev.offsetX || ev.offsetX == 0) { // Opera
		mx = ev.offsetX;
		my = ev.offsetY;
	}

	return new Coordinate(mx, my);
}

function convertCoordinateFromGrid(gridX, gridY, canvasAreaWidth, iconMargin, iconWidth, iconHeight){
	var coordinate = new Coordinate(0, 0);
	coordinate.x = (canvasAreaWidth + iconMargin) + (iconWidth * gridX);
	coordinate.y = ((iconHeight+iconMargin)*gridY) + iconMargin;
	return coordinate;
}