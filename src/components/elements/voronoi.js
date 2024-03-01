"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3 = require("d3");
var d3Delaunay = require("d3-delaunay");
var Delaunay = d3Delaunay.Delaunay, Voronoi = d3Delaunay.Voronoi, Polygon = d3Delaunay.Polygon;
/**
 * Class for creating a reactive Voronoi diagram, using D3.js + D3-Delaunay
 */
var D3Voronoi = /** @class */ (function () {
    function D3Voronoi(targetContainer) {
        if (targetContainer === void 0) { targetContainer = '#vonoroi'; }
        this.width = 0;
        this.height = 0;
        this.sites = [];
        this.target = d3.select(targetContainer);
        this.renderTheAwesome();
        this.watchForResize();
    }
    D3Voronoi.prototype.renderTheAwesome = function () {
        var _this = this;
        this.svg = this.target.append('svg');
        this.width = this.target.node().getBoundingClientRect().width;
        this.height = this.target.node().getBoundingClientRect().height;
        this.svg.attr('width', this.width);
        this.svg.attr('height', this.height);
        // this.mouseLeaveEvents();
        this.sites = d3.range(300).map(function () {
            return [Math.random() * _this.width, Math.random() * _this.height];
        });
        this.delaunay = Delaunay.from(this.sites);
        this.voronoi = this.delaunay.voronoi([-1, -1, this.width + 1, this.height + 1]);
        this.polygon = this.svg.append('g')
            .attr('class', 'polygons')
            .selectAll('path')
            .data(this.voronoi.cellPolygons())
            .enter().append('path')
            .call(this.redrawPolygon.bind(this));
        this.site = this.svg.append('g')
            .attr('class', 'sites')
            .selectAll('circle')
            .data(this.sites)
            .enter().append('circle')
            .attr('r', 2.5)
            .call(this.redrawSite.bind(this));
        this.svg.on('pointermove', function (event) {
            var _a = d3.pointer(event, _this.svg.node()), mx = _a[0], my = _a[1];
            var siteIndex = _this.delaunay.find(mx, my);
            // this.polygon.attr('class', (d: typeof Polygon, i: number) => i === siteIndex ? 'highlight' : 'v-' + i % 9);
            _this.sites[0] = [mx, my];
            _this.redraw();
        });
    };
    D3Voronoi.prototype.redraw = function () {
        this.delaunay = Delaunay.from(this.sites);
        this.voronoi = this.delaunay.voronoi([-1, -1, this.width + 1, this.height + 1]);
        this.polygon = this.polygon.data(this.voronoi.cellPolygons()).join('path').call(this.redrawPolygon.bind(this));
        this.site = this.site.data(this.sites).join('circle').call(this.redrawSite.bind(this));
    };
    // private redrawPolygon(polygon: d3.Selection<d3.BaseType, typeof Polygon, SVGGElement, unknown>) {
    //   polygon
    //     .attr('d', (d: typeof Polygon) => d ? 'M' + d.join('L') + 'Z' : null)
    //     .attr('class', (d: typeof Polygon, i: number) => 'v-' + i % 9);
    // }
    D3Voronoi.prototype.redrawPolygon = function (polygon) {
        var _this = this;
        polygon
            .attr('d', function (d) { return d ? 'M' + d.join('L') + 'Z' : null; })
            .attr('class', function (d, i) {
            var centroid = d3.polygonCentroid(d);
            var relativeHeight = centroid[1] / _this.height;
            var classIndex = Math.ceil(relativeHeight * 10);
            var randomIndex = Math.floor(Math.random() * 10);
            return "r-".concat(randomIndex, " c-").concat(classIndex);
        });
    };
    D3Voronoi.prototype.redrawSite = function (site) {
        site
            .attr('cx', function (d) { return d[0]; })
            .attr('cy', function (d) { return d[1]; });
    };
    D3Voronoi.prototype.rerender = function () {
        this.svg.remove();
        this.renderTheAwesome();
    };
    D3Voronoi.prototype.watchForResize = function () {
        var _this = this;
        var resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () { return _this.rerender(); }, 250);
        });
    };
    return D3Voronoi;
}());
exports.default = D3Voronoi;
