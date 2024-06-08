export class SwaggerUI {
  constructor(private readonly applicationUrl: string) {}

  private customSiteTitle = 'Custom Swagger UI';
  private faviconFilename = 'nestjs-logo.png';
  private topbarIconFilename = 'app-logo.png';

  private customfavIcon: string = `${this.applicationUrl}/wwwroot/swagger/assets/${this.faviconFilename}`;
  private customCss: string = ``;

  private swaggerOptions = {
    persistAuthorization: true,
  };

  public customOptions = {
    customfavIcon: this.customfavIcon,
    customSiteTitle: this.customSiteTitle,
    customCss: this.customCss,
    swaggerOptions: this.swaggerOptions,
  };
}
