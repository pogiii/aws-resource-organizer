# aws-resource-organizer

This node.js application takes json created from the command:
```
aws resourcegroupstaggingapi get-resources --region <region>
```

As of right now it will output a new json file under the reports folder.
It is recommended to browse this with a JSON Explorer.

## TODO
- Refactor
- Improve output data structure.
- Turn output into a pretty HTML that has an awesome UX.
- Make it so you don't need to run the mentioned command before using the tool.
- Write better documentation