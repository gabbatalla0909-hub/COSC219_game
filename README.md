# Lab 7: Trail List


The click listener is attached to trail list rather than to each button due to getting the buttons destroyed and rebuilt on each reload

If `loadTrails` did not guard against corrupt data, a missing key, invalid JSON, or a non-array value would hand `null` or throw a `SyntaxError` to the app, and the page would break or never load at all.
If loadtrails did not guard against corrupt data, the page breaks after throwing a syntax error 

Ai had been used to further understand how each code works and to know if I was doing the right thing
