import React, { useRef, useEffect } from 'react';
import { Dimensions } from 'react-native';
import * as echarts from 'echarts/core';
import { LineChart, PieChart, BarChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
  ToolboxComponent,
  TitleComponent,
} from 'echarts/components';
import { SVGRenderer, SkiaChart, SvgChart } from '@wuba/react-native-echarts';

echarts.use([
  SVGRenderer,
  LineChart,
  GridComponent,
  PieChart,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
  BarChart,
  TitleComponent,
]);

export default function GraficEcharts({
  option,
  width,
  height,
}: {
  option: any;
  width?: number;
  height?: number;
}) {
  const E_HEIGHT = height !== undefined ? height | 0 : 400;
  const E_WIDTH =
    Dimensions.get('screen').width + (width !== undefined ? width | 0 : 0);
  const skiaRef = useRef<any>(null);
  useEffect(() => {
    let chart: any;
    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, 'light', {
        renderer: 'svg',
        width: E_WIDTH,
        height: E_HEIGHT,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [option]);

  return <SvgChart ref={skiaRef} />;
}
