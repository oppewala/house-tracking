package htconfig

import (
	"github.com/spf13/viper"
)

// Configuration is
type Configuration struct {
	MongoDB string
}

// Retrieve configuration
func Retrieve() (*Configuration, error) {
	viper.SetEnvPrefix("ht")
	viper.AutomaticEnv()

	config := &Configuration{
		MongoDB: viper.GetString("MONGODB"),
	}

	return config, nil

	// Retrieve from config.yaml
	// viper.AddConfigPath(".")
	// viper.AddConfigPath("$HOME")
	// viper.SetConfigType("yaml")
	// viper.SetConfigName("config")
	// err := viper.ReadInConfig()
	// if err != nil {
	// 	return nil, err
	// }

	// config := &Configuration{
	// 	MongoDB: viper.GetString("global.database.connection"),
	// }
}
