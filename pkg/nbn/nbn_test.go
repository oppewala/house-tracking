package nbn

import (
	"testing"
)

func TestSearch(t *testing.T) {
	address := Address{
		Street:   "37 Camera Walk",
		Suburb:   "Coburg North",
		Postcode: "3058",
		State:    "VIC",
	}
	r, err := Search(address)

	t.Logf("Response: %+v", r)
	if err != nil {
		t.Log(err)
		t.Fail()
	}
}

func TestLookup(t *testing.T) {
	id := "LOC000140347733"
	r, err := Lookup(id)

	if err != nil {
		t.Log(err)
		t.Fail()
	}

	if r.TechType != "FTTP" {
		t.Logf("Response: %+v", r)
		t.Fail()
	}
}
