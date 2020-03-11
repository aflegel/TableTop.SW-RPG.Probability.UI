# Search Incrementer

## Required Input

A `Die Type` is required as it used to display the type.  It is also used to tell the search which die type is being modified

## Callback output

### Increment

The incrementer calls the `addDieCallback` and passes in the `Die Type`.

### Decrement

The incrementer calls the `removeDieCallback` callback  and passes the `Die Type`.
