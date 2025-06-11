// Copyright 2025 Sébastien Demanou. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ==============================================================================
const helper = require("node-red-node-test-helper");
const toMarkdownNode = require("../markdown.js");

helper.init(require.resolve('node-red'));

describe('to-markdown Node', () => {
  beforeEach((done) => {
    helper.startServer(done);
  });

  afterEach((done) => {
    helper.unload();
    helper.stopServer(done);
  });

  it('should be loaded', (done) => {
    const flow = [{ id: "n1", type: "to-markdown", name: "to-markdown" }];

    helper.load(toMarkdownNode, flow, () => {
      const n1 = helper.getNode("n1");

      try {
        n1.should.have.property('name', 'to-markdown');
        done();
      } catch(err) {
        done(err);
      }
    });
  });

  it('should make payload to markdown', (done) => {
    const flow = [
      { id: "n1", type: "to-markdown", name: "to-markdown", wires:[["n2"]] },
      { id: "n2", type: "helper" }
    ];

    helper.load(toMarkdownNode, flow, () => {
      const n2 = helper.getNode("n2");
      const n1 = helper.getNode("n1");

      n2.on("input", (msg) => {
        try {
          msg.should.have.property('payload', '# Hello World');
          done();
        } catch(err) {
          done(err);
        }
      });

      n1.receive({ payload: '<h1>Hello World</h1>\n' });
    });
  });
});
