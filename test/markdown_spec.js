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

  it("should convert msg field html to markdown", function (done) {
    const flow = [
      {
        id: "n1",
        type: "to-markdown",
        name: "to-markdown",
        htmlType: "msg",
        html: "htmlContent",
        wires: [["n2"]]
      },
      { id: "n2", type: "helper" }
    ];

    helper.load(toMarkdownNode, flow, () => {
      const n2 = helper.getNode("n2");
      const n1 = helper.getNode("n1");

      n2.on("input", (msg) => {
        msg.payload.should.equal("# Hello World");
        done();
      });

      n1.receive({ htmlContent: "<h1>Hello World</h1>" });
    });
  });

  it("should convert msg payload to markdown", function (done) {
    const flow = [
      {
        id: "n1",
        type: "to-markdown",
        name: "to-markdown",
        htmlType: "msg",
        html: "payload",
        wires: [["n2"]]
      },
      { id: "n2", type: "helper" }
    ];

    helper.load(toMarkdownNode, flow, () => {
      const n2 = helper.getNode("n2");
      const n1 = helper.getNode("n1");

      n2.on("input", (msg) => {
        msg.payload.should.equal("# Hello World");
        done();
      });

      n1.receive({ payload: "<h1>Hello World</h1>" });
    });
  });

  it("should convert a msg field html to markdown", function (done) {
    const flow = [
      {
        id: "n1",
        type: "to-markdown",
        name: "to-markdown",
        htmlType: "msg",
        html: "content",
        wires: [["n2"]]
      },
      { id: "n2", type: "helper" }
    ];

    helper.load(toMarkdownNode, flow, () => {
      const n2 = helper.getNode("n2");
      const n1 = helper.getNode("n1");

      n2.on("input", (msg) => {
        msg.payload.should.equal("# Hello World");
        done();
      });

      n1.receive({ content: "<h1>Hello World</h1>" });
    });
  });

  it("should convert deep msg field html to markdown", function (done) {
    const flow = [
      {
        id: "n1",
        type: "to-markdown",
        name: "to-markdown",
        htmlType: "msg",
        html: "data.article.content",
        wires: [["n2"]]
      },
      { id: "n2", type: "helper" }
    ];

    helper.load(toMarkdownNode, flow, () => {
      const n2 = helper.getNode("n2");
      const n1 = helper.getNode("n1");

      n2.on("input", (msg) => {
        msg.payload.should.equal("# Hello World");
        done();
      });

      n1.receive({ data: { article: { content: "<h1>Hello World</h1>" } } });
    });
  });

  it("should convert global context html to markdown", function (done) {
    const flow = [
      {
        id: "n1",
        type: "to-markdown",
        name: "to-markdown",
        htmlType: "global",
        html: "htmlContent",
        wires: [["n2"]]
      },
      { id: "n2", type: "helper" }
    ];

    helper.load(toMarkdownNode, flow, {}, () => {
      const n1 = helper.getNode("n1");
      const n2 = helper.getNode("n2");

      n1.context().global.set("htmlContent", "<h1>Hello World</h1>\n");

      n2.on("input", (msg) => {
        msg.should.have.property('payload', '# Hello World');
        done();
      });

      n1.receive({});
    });
  });
});
