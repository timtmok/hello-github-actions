"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const core = require('@actions/core');
const github = require('@actions/github');
const { context } = require('@actions/github/lib/utils');
function run() {
  return __awaiter(this, void 0, void 0, function* () {
    const octokit = github.getOctokit(core.getInput('github_token'))
    const release = octokit.repos.createRelease({
      owner: context.repo.owner,
      repo: context.repo.repo,
      tag_name: core.getInput('tag_name'),
    })

    octokit.git.getRef({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref: `tags/${core.getInput('tag_name')}`,
    }).then((tag) => {
      octokit.git.updateRef({
        owner: context.repo.owner,
        repo: context.repo.repo,
        ref: "production",
        sha: tag['object']['sha'],
        force: true,
      })
    })
  });
}
run();