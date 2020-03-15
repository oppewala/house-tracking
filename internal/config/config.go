package htconfig

import "github.com/spf13/viper"

// Configuration is
type Configuration struct {
	MongoDB string
}

// Retrieve configuration
func Retrieve() (*Configuration, error) {
	viper.SetConfigFile("config.yaml")
	viper.SetConfigType("yaml")

	err := viper.ReadInConfig()
	if err != nil {
		return nil, err
	}

	config := &Configuration{
		MongoDB: viper.GetString("global.database.connection"),
	}

	return config, nil
}
