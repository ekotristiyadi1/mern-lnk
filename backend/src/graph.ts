import { INestApplication } from '@nestjs/common';
import { SpelunkerModule } from 'nestjs-spelunker';
import * as fs from 'fs';

export function setupGraphDependencies(app: INestApplication) {
  // 1. Generate the tree as text
  const tree = SpelunkerModule.explore(app);
  const root = SpelunkerModule.graph(tree);
  const edges = SpelunkerModule.findGraphEdges(root);
  const jsonData = JSON.stringify(edges, null, 2);
  const filePath = __dirname + '/graph.json';
  fs.writeFileSync(filePath, jsonData, 'utf-8');

  console.log(`processing data ${filePath}`);

  // const mermaidEdges = edges
  //   .filter(
  //     ({ from, to }) =>
  //       !(
  //         from.module.name === 'AuthModule' ||
  //         from.module.name === 'CoreModule' ||
  //         to.module.name === 'UsersModule'
  //       ),
  //   )
  //   .map(({ from, to }) => `${from.module.name}-->${to.module.name}`);
  // console.log(
  //   `graph copy to https://mermaid.live/ to show graph dependencies: \n\t${mermaidEdges.join(
  //     '\n\t',
  //   )}`,
  // );
}
